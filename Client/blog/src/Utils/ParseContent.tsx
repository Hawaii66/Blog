type ValidateHTMLType = (content:string) => string;

export const ValidateHTML:ValidateHTMLType = (content) => {
    const validHTMLTags:string[] = [
        "<h1>",
        "<h2>",
        "<h3>",
        "<h4>",
        "<h5>",
        "<b>",
        "<i>",
        "<ul>",
        "<ol>",
        "<li>",
        "<table>",
        "<tr>",
        "<th>",
        "<math>"
    ];
    const validHTMLTagsNoClose:string[] = [
        "<br>"
    ]

    var openTags:string[] = [];
    var tag = "";
    var tagValue = "";
    var collectiongValue = false;
    var collectingTag = false;
    var closingTag = false;
    var openTagStart = 0;

    //content = content.replaceAll("\n","<br>");

    for(var i = 0; i < content.length; i ++){
        if(content[i] === "<")
        {
            if(content[i + 1] === "/")
            {
                closingTag = true;

                collectiongValue = false;
            }else{
                openTagStart = i;
            }

            collectingTag = true;
        }

        if(collectingTag)
        {
            tag += content[i];
        }

        if(collectiongValue)
        {
            tagValue += content[i];
        }

        if(content[i] === ">")
        {
            if(closingTag)
            {
                if(openTags[openTags.length - 1] === tag.replace("/",""))
                {
                    if(openTags[openTags.length - 1] === "<math>")
                    {
                        content = content.slice(0, openTagStart + 1) + `Equation value="${tagValue}"/` + content.slice(i);
                        i += `Equation value="${tagValue}"/`.length;
                    }

                    openTags.pop();
                    tag = "";
                    closingTag = false;
                    collectingTag = false;

                    //Parse <math>2^3</math>
                    tagValue = "";
                }else{
                    return "<h1>Error, wrong closing tag for the current open tag</h1>";
                }
            }else{
                if(validHTMLTags.includes(tag))
                {
                    openTags.push(tag);
                    tag = "";
                    closingTag = false;
                    collectingTag = false;
                    collectiongValue = true;
                    tagValue = "";
                }else if(validHTMLTagsNoClose.includes(tag)){
                    tag = "";
                    closingTag = false;
                    collectingTag = false;
                    collectiongValue = true;
                    tagValue = "";
                }
                else{
                    return "<h1>Sneaky! that is not a allowed html tag<h1>";
                }
            }
        }
    }

    if(openTags.length > 0)
    {
        return "<h1>Open tag without a closing tag at the end!<h1>"
    }

    return content;
}