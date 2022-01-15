export interface Tree {
    path:boolean[],
    tree:Node[]
}

export interface Node {
    right:Node|null,
    left:Node|null,
    text:string|null
    value:number,
    path:boolean[]
}

const emptyNode:Node = {
    right:null,
    left:null,
    text:"",
    value:0,
    path:[]
}

export const FromTree = (tree:string):string => {
    var split = tree.split(",");
    console.log(split);
    var masterNode:Node = {
        left:null,
        path:[],
        right:null,
        text:"",
        value:0
    }
/*
    split[0] = "1" + split[0];
    split[2] = "1" + split[2];
    split[4] = "1" + split[4];
    split[6] = "1" + split[6];
    split[8] = "1" + split[8];

    console.log(split[0], parseInt(split[0],2), parseInt(split[0],2).toString(36), parseInt(parseInt(split[0],2).toString(36), 36).toString(2));
    console.log(split[2], parseInt(split[2],2), parseInt(split[2],2).toString(36));
    console.log(split[4], parseInt(split[4],2), parseInt(split[4],2).toString(36));
    console.log(split[6], parseInt(split[6],2), parseInt(split[6],2).toString(36));
    console.log(split[8], parseInt(split[8],2), parseInt(split[8],2).toString(36));

    var superSplit = tree.split("");
    var isDigits = true;
    var testO:string[] = [];
    var tempStore:string = "";
    for(var i = 0; i < superSplit.length; i ++){
        if(isDigits){
            if(superSplit[i] === "0" || superSplit[i] === "1"){
                tempStore += superSplit[i];
                continue;
            }
            isDigits = false;
            testO.push(tempStore);
            tempStore = "";
        }
        else
        {
            tempStore += superSplit[i];

            if(superSplit[i] === ","){
                isDigits = true;
                testO.push(tempStore);
                tempStore = "";
                continue;
            }
        }
    }

    console.log(testO);
*/
    var node = masterNode;
    var lastVisitedNode:Node|null = null;
    var isPath = true;
    for(var i = 0; i < split.length - 1; i ++){
        if(isPath){
            var path = split[i].split("");
            node = masterNode;
            for(var j = 0; j < path.length; j ++){
                if(path[j] == "0"){
                    if(node.left === null){
                        node.left = {
                            left:null,
                            path:[],
                            right:null,
                            text:"",
                            value:0
                        }
                    }
                    node = node.left;
                }
                if(path[j] == "1"){
                    if(node.right === null){
                        node.right = {
                            left:null,
                            path:[],
                            right:null,
                            text:"",
                            value:0
                        }
                    }
                    node = node.right;
                }
                lastVisitedNode = node;
            }
            isPath = false;
            continue;
        }

        if(!isPath){
            if(lastVisitedNode !== null){
                lastVisitedNode.text = split[i];
            }
            isPath = true;
            continue;
        }

    }

    var path = split[split.length - 1].split("");
    var output = "";
    var node = masterNode;
    for(var i = 0; i < path.length; i ++){
        if(path[i] == "1" && node.right !== null){
            node = node.right;
        }
        if(path[i] == "0" && node.left !== null){
            node = node.left;
        }

        if(node.text !== ""){
            output += node.text;
            node = masterNode;
        }
    }

    return output;
}

export const ToTree = (text:string):string => {
    var tempDict: {[key:string]: number} = {};
    for(var i = 0; i < text.length; i ++){
        if(tempDict[text[i]] == null){
            tempDict[text[i]] = 1;
        }else{
            tempDict[text[i]] += 1;
        }
    }

    var array:Node[] = [];

    for (let key in tempDict) {
        let value = tempDict[key];
        var target = binarySearch([...array], value);
        array.splice(target + 1, 0, {
            left:null,
            right:null,
            text:key,
            value:value,
            path:[]
        });
    }

    while(array.length !== 1){
        var min = array[0];
        var min2 = array[1];

        var newNode:Node = {
            left:min,
            right:min2,
            text:"",
            value:min.value + min2.value,
            path:[]
        }

        array.splice(0, 1);
        array.splice(0, 1);

        var target = binarySearch([...array], newNode.value);
        array.splice(target + 1, 0, newNode);
    }

    const masterNode = recursivePathMaker(array[0], []);

    var output = "";
    output = recursivePathGetter(masterNode, "");

    var pathDict = getTextPath(masterNode,{});
    var splitText = text.split("");
    for(var i = 0; i < splitText.length; i ++){
        output += boolArrayToString(pathDict[splitText[i]]);
    }

    return output;
}

const getTextPath = (node:Node, dict:{[key:string]: boolean[]}):{[key:string]: boolean[]} => {
    if(node.text !== "" && node.text !== null){
        dict[node.text] = node.path;
        return dict;
    }
    if(node.left !== null)
        dict = {...dict,...getTextPath(node.left, dict)};
    if(node.right !== null)
        dict = {...dict,...getTextPath(node.right, dict)};
    
    return dict;
}

const recursiveTextGetter = (node:Node, output:string):string => {
    if(node.right !== null){
        output += recursiveTextGetter(node.right, output);
    }
    if(node.left !== null){
        output += recursiveTextGetter(node.left, output);
    }

    if(node.text !== ""){output += boolArrayToString(node.path);}
    return output;
}

const recursivePathGetter = (node:Node, output:string):string => {
    if(node.right !== null){
        output = recursivePathGetter(node.right, output);
    }
    if(node.left !== null){
        output = recursivePathGetter(node.left, output);
    }
    if(node === null || node.text === null || node.text === ""){return output;}
    output += boolArrayToString(node.path) + "," + node.text.toString() + ",";
    return output;
}

const boolArrayToChar = (array:boolean[]):string => {
    array = [true, ...array];
    
    var sArray = boolArrayToString(array);
    //console.log(array, parseInt(sArray,2), parseInt(sArray,2).toString(36));
    var output = parseInt(sArray,2).toString(36);
    return output;
}

const boolArrayToString = (array:boolean[]):string => {
    var output = "";
    for(var i = 0; i < array.length; i ++){
        if(array[i]){output += "1"}
        else{output += "0";}
    }

    return output;
}

const recursivePathMaker = (node: Node, path:boolean[]):Node => {
    node.path = path;
    if(node.left !== null){
        node.left.path = recursivePathMaker(node.left, [...node.path, true]).path;
    }
    if(node.right !== null){
        node.right.path = recursivePathMaker(node.right, [...node.path, false]).path;
    }
    return node;
}

const binarySearch = (array:Node[], target:number):number => {
    var arrayCount = array.length;
    var L = 0;
    var R = arrayCount - 1;
    var m = 0;

    var lastMod = false;

    if(arrayCount == 0){return 0;}
    while(L <= R){
        m = Math.floor((L + R) / 2);

        if(array[m].value < target){
            L = m + 1;
            lastMod = false;
            continue;
        }

        if(array[m].value > target){
            R = m - 1;
            lastMod = true;
            continue;
        }

        return m;
    }
    if(lastMod){return m - 1}

    return m;
}