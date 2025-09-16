# 浏览器缓存

- 缓存顺序：强缓存 || 默认缓存 -> 协商缓存
- 浏览器根据 cache-control、Expires 来判断强缓存，强缓失效后会判断协商缓存，一般响应头有 Last-Modified 字段但是没有强缓存字段时会走启发式缓存也就是浏览器默认缓存

## 1.强缓存 200 (from disk cache / memory cache)

- **强缓存的相对时间为 Date 字段，现在一般都是用 Cache-Control**

- **优先级 Cache-Control > Expires > Pragma**

#### 1. Cache-Control （HTTP/1.1，更常用 ✅）

Cache-Control: max-age=3600, public

常见指令：

max-age=秒数：资源在多少秒内有效（相对时间）。

s-maxage=秒数：给 共享缓存（CDN、代理） 使用，优先级高于 max-age。

public：允许浏览器和中间缓存（CDN、代理）缓存。

private：只能浏览器缓存，CDN 不缓存。

no-cache：跳过强缓存，但允许走协商缓存。

no-store：完全禁止缓存。

must-revalidate：缓存过期后必须向服务器重新验证。

---

#### 2. Expires （HTTP/1.0）

Expires: Tue, 16 Sep 2025 12:00:00 GMT

指定缓存资源的 过期时间（绝对时间）。

如果客户端本地时间 < Expires，缓存有效。

---

#### 3. Pragma （HTTP/1.0，已过时）

Pragma: no-cache

作用等同于 Cache-Control: no-cache。

主要用于兼容老版本 HTTP。

## 2.启发式缓存（默认缓存） 200 (from disk cache / memory cache)

- **当没有对应强缓存字段，但是有 Date, Last-Modified 的值的时候会走默认缓存，各个浏览器判定规则有所不同，大部分都是 1 天或者几天**

- **启发式缓存的 max-age = (Date - Last-Modified) \* 0.1**

## 3.协商缓存 304 Not Modified

- **当强缓存或者默认缓存失效时，浏览器会带上资源的标识信息请求服务器**

- **响应头跟请求头的相应字段匹配来判定是否触发缓存，响应字段 ETag / Last-Modified 对应请求字段 If-None-Match / If-Modified-Since**

- **优先级 ETag->Last-Modified**
