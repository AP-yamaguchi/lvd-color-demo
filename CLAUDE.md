# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

7色のLED美肌マスクをシミュレートするシンプルなWebアプリケーション。
スマホの画面全体を指定した色で表示し、美肌ケアのLED効果を再現する。

## 技術スタック

- **React 19** + **TypeScript**
- **Vite 7** (ビルドツール)
- Pure CSS (外部ライブラリ不使用)

## 開発コマンド

```bash
# 開発サーバーを起動 (http://localhost:5173)
npm run dev

# プロダクションビルド (dist/フォルダに出力)
npm run build

# ビルドしたアプリをローカルでプレビュー
npm run preview

# ESLintでコードチェック
npm run lint
```

## アーキテクチャ

### コンポーネント構成

- **App.tsx**: 単一のメインコンポーネント
  - 7色の配列データ（赤、橙、黄、緑、青、藍、紫）を定義
  - `selectedColorIndex` stateで現在選択中の色を管理
  - Wake Lock APIでスマホのスリープを防止

### カラーデータ構造

```typescript
interface Color {
  name: string  // 色名（日本語）
  hex: string   // HEXカラーコード
  rgb: string   // RGB値（未使用だが将来の拡張用）
}
```

7色は固定で、以下の順序：
1. 赤 (#FF0000)
2. 橙 (#FF7F00)
3. 黄 (#FFFF00)
4. 緑 (#00FF00)
5. 青 (#0000FF)
6. 藍 (#4B0082)
7. 紫 (#9400D3)

### スタイリング設計

- **モバイルファースト**: 基本はスマホ向けデザイン
- **レスポンシブ対応**: タブレット・PCでも適切に表示
- ボタンエリアは画面下部に固定配置
- 半透明の背景とblur効果でモダンなUI
- 選択中のボタンには白いボーダーで視覚的フィードバック

### Wake Lock API

[App.tsx:25-47](src/App.tsx#L25-L47)で実装。
- アプリ起動時に自動で画面スリープを防止
- コンポーネントのアンマウント時にロックを解放
- 対応ブラウザのみで動作（非対応時はエラーログのみ）

## GitHub Pagesデプロイ時の注意

[vite.config.ts:9](vite.config.ts#L9)で `base: './'` を設定済み。
リポジトリ名がURLパスに含まれる場合は、以下のように変更：

```typescript
base: '/your-repo-name/',
```

## 設計思想

- **シンプル第一**: 余計な機能は追加しない
- **依存関係の最小化**: 外部ライブラリは使わない
- **モバイル最適化**: スマホでの使用を最優先
- **パフォーマンス**: 軽量で高速な動作

## 今後の拡張可能性（現在は未実装）

- タイマー機能（各色の使用時間を計測）
- 色の順序カスタマイズ
- 画面の明るさ調整UI
- 使用履歴の記録
