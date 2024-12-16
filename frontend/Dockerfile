# ベースイメージを選択（Node.js）
FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 必要な依存関係をインストール
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# ビルド用ポートをエクスポート
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]