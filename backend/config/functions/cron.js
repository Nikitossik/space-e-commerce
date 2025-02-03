const fs = require("fs").promises
const path = require("path")

const dirPublic = path.resolve(".", "public")
const dirFeeds  = path.resolve(dirPublic, "feeds")
const file      = "google-merchant-center.xml"

async function createOrUpdateFile(content) {
    const dir = await fs.access(dirFeeds).then(() => dirFeeds).catch(() => dirPublic)
    await fs.writeFile(`${dir}/${file}`, content, "utf-8")
}

function getCleanDescription(content) {
    return content.replace(/\*?\s*!\[.*?\]\(.*?\)\s*\*?/g, '');
}

function getPreparedCharacteristic(content) {
    const regex = /- (.*?) - (.*?)\n/g

    let extractedData = Object.create([]),
        match = null

    while ((match = regex.exec(content)) !== null) {
        let [, attrName, attrValue] = match
        extractedData.push(`
            <g:product_detail>
                <g:attribute_name>${attrName}</g:attribute_name><g:attribute_value>${attrValue}</g:attribute_value>
            </g:product_detail>
        `)
    }

    return [...extractedData].join('')
}

function getPreparedProduct(productItem) {
    const additionalImageLinks = productItem.imagesSlider.map(elt => {
        return `<g:additional_image_link>https://api.space.in.ua${elt.url}</g:additional_image_link>`
    })
    const characteristics = getPreparedCharacteristic(productItem.characteristic)
    const description = getCleanDescription(productItem.description)

    return `
        <item>
            <g:id>${productItem.id}</g:id>
            <g:title>${productItem.title}</g:title>
            <g:brand>${productItem.brand}</g:brand>
            <g:description>${description}</g:description>
            <g:link>https://space.in.ua/product_list/${productItem.categoryName}/${productItem.id}/${productItem.title}</g:link>
            <g:image_link>https://api.space.in.ua${productItem.imagesSlider[0].url}</g:image_link>
            <g:condition>new</g:condition>
            ${additionalImageLinks.length > 0 ? [...additionalImageLinks].join("") : ``}
            ${characteristics}
            ${productItem.inStock ? `<g:availability>in_stock</g:availability>` : ``}
            ${productItem.outOfStock ? `<g:availability>out_of_stock</g:availability>` : ``}
            ${
            productItem.oldPrice > productItem.relevantPrice
                ? `<g:sale_price>${productItem.relevantPrice} UAH</g:sale_price>`
                : ``
            }
            ${
            productItem.oldPrice > productItem.relevantPrice
                ? `<g:price>${productItem.oldPrice} UAH</g:price>`
                : `<g:price>${productItem.relevantPrice} UAH</g:price>`
            }
        </item>
    `
}

function convertJsonToGoogleMerchantFmt(products) {
    const items = products.map(getPreparedProduct).join("")
    return `
        <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
            <channel>
                <title>Space</title>
                <link>https://space.in.ua/</link>
                <g:description>RSS 2.0 Product Data Feed</g:description>
                ${items}
            </channel>
        </rss>
    `
}

module.exports = {
    "0 10 * * *": async ({ strapi }) => {
        let allProducts = Object.create([]),
            apiResponse = Object.create({}),
            currentPage = 1

        try {
            do {
                apiResponse = await strapi.entityService.findPage("api::product.product", {
                    pageSize: 25,
                    page: currentPage,
                    populate: "*",
                    sort: {
                        id: "desc",
                    },
                })
                allProducts.push(...apiResponse.results)
                currentPage++
            } while (currentPage <= apiResponse.pagination.pageCount)
        } catch (error) {
            strapi.log.error("Uh-oh! An error occurred: ", error)
            return
        }

        if (!allProducts || allProducts.length === 0) {
            strapi.log.info("No data is available for 'Products'")
            return
        }

        const googleMerchant = convertJsonToGoogleMerchantFmt(allProducts)

        try {
            await createOrUpdateFile(googleMerchant)
            strapi.log.info("The 'XML' feed file for Google Merchant Center was successfully created")
        } catch (error) {
            strapi.log.error("Uh-oh! An error occurred: ", error)
        }
    }
}
