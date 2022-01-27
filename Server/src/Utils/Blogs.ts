import { BlogInterface } from "../Interfaces/BlogInterface";

type SortBlogsType = (blogs:BlogInterface[]) => BlogInterface[];

export const SortBlogs:SortBlogsType = (blogs) => {
    var sorted:BlogInterface[] = [];
    var endLen = blogs.length;

    var first:BlogInterface|undefined = blogs.pop();
    if(first === undefined){return [];}
    sorted.push(first);

    var l = 0;
    var r = sorted.length - 1;

    var blog:BlogInterface|undefined = blogs.pop();
    var lastShift = false;
    while(sorted.length !== endLen){
        var middle = Math.floor((l+r)/2);

        if(blog===undefined){endLen -= 1; continue;}

        if(blog.publishDate < sorted[middle].publishDate){
            r = middle - 1;
            lastShift = true;
        }else if(blog.publishDate > sorted[middle].publishDate){
            l = middle + 1;
            lastShift = false;
        }

        if(l > r){
            sorted.splice(lastShift ? middle : middle + 1, 0, blog);
            blog = blogs.pop();
            l = 0;
            r = sorted.length - 1;
        }
    }

    return sorted;
}