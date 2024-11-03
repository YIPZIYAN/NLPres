// import {joinURL} from "ufo";
//
// export default defineEventHandler(async (event) => {
//     const baseUrl = useRuntimeConfig().myProxyUrl
//     const path = event.path.replace(/^\/api\//, '');
//     const target = joinURL(baseUrl, path)
//
//     return proxyRequest(event,target)
// })