import express from "express"
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from "rehype-pretty-code";
import * as Cheerio from "cheerio"

import { unified } from 'unified'


const app = express()
const PORT = 3000;
app.set('view engine', 'ejs');



app.set('views', path.join(process.cwd(), 'views'));

app.get("/", async (req, res) => {
    //read md file from spacific path
    const blogData = fs.readFileSync("./src/data.md", { encoding: "utf-8" })

    // split content and data from the md file 
    let { content, data } = matter(blogData)

    // filltaring for md -> html
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: data.title })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypePrettyCode, {
            // add more themes
            theme: "github-dark-default"
        })
        .process(content)

    // load html which is proecessd by the unified
    const $ = Cheerio.load(file.toString(), { decodeEntities: false });

    // get all html inside body
    const bodyContent = $('body').html();
    // warap this content inside a new div with id
    const wrapperDiv = $('<div></div>').attr("id", "blog--content--wrapper").html(bodyContent);
    // append data in body
    $('body').empty().append(wrapperDiv);

    // find heading tags for links
    const headingTags = $('h1, h2, h3, h4, h5, h6');

    let headingLinks = [];
    headingTags.each(function () {
        const text = $(this).text().trim();
        const id = text.replace(/\s+/g, '-');
        $(this).attr('id', id);
        headingLinks.push({ text, id });
    });

    let finalHtml = $("body").html();

    // send data to views
    res.render('index', { html_data: finalHtml, data, headingLinks });
})

app.listen(PORT, () => console.log("Server Running On http://localhost:" + PORT))
