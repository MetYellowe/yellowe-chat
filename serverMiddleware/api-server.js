export default async (req, res, next) => {
    let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
    url = url.split("/");
    let method = url.pop();
    let controller = url.slice(1).join("/");
    let api = require("../api/" + controller);
    let result = await api[method](req.params);
    res.set({
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
    })
    res.end(JSON.stringify(result));
};