type ConvertToJSX = (content:string) => string;

export const ConvertToJSX:ConvertToJSX = (content) => {
    var arr:string[] = [];
    const validHTML:string[] = [
        "<h1>",
        "<h2>",
        "<h3>",
        "<h4>",
        "<h5>",
        "<b>",
        "<br>",
        "<i>"
    ]

    // Validate that the correct HTML tags exists
    for(var i = 0; i < content.length; i ++){
        var char = content[i];
        var work = char;
        var check = false;

        if(char === '<'){
            for(var j = i; j < content.length; j ++){
                if(content[j] === '/'){
                    check = true;
                }
                
                work += content[j];

                if(content[j] === ">"){
                    if(!validHTML.includes(work)){
                        return `Error, wrong HTML tag used: ${work}; try again`;
                    }

                    break;
                }
            }

            if(check)
            {
                if(arr[arr.length - 1] == work.replace('/',"")){
                    arr.pop();
                }else{
                    return "<h1>Error, Cant convert string to HTML</h1>"
                }
            }
            else
            {
                arr.push(work);
            }
        }
    }

    return content;
}