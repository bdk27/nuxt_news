# 使用輕量版 Node.js 作為基礎
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm install

# 複製整個專案
COPY . .

# 編譯 Nuxt 應用（適用於 SSR 模式）
RUN npm run build

# 設定環境變數
ENV NITRO_PRESET=node

# 開放 3000 端口
EXPOSE 3000

# 啟動 Nuxt 應用
CMD ["node", ".output/server/index.mjs"]
