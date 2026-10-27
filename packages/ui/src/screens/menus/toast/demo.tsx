import { Toast, ToastStack } from "./index";

export function ToastDemo() {
  return <Toast description="解锁了新配方" icon="sprites/toast/recipe_book.png" title="配方已解锁" />;
}

export function ToastStackDemo() {
  return <ToastStack toasts={[{ title: "A" }, { title: "B", variant: "system" }]} />;
}
