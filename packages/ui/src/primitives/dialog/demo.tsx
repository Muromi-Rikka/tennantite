"use client";

import { useState } from "react";

import { Button } from "../button/index";
import { Dialog, DialogClose, DialogDescription, DialogPopup, DialogTitle, DialogTrigger } from "./index";

/**
 * Dialog 预览用例：确认框
*/
export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-16">
      <DialogTrigger
        render={
          <Button>保存并退出到标题界面</Button>
        }
      />
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogPopup>
          <DialogTitle>确认退出？</DialogTitle>
          <DialogDescription className="mt-8">
            未保存的进度将会丢失。
          </DialogDescription>
          <div className="mt-24 flex justify-end gap-16">
            <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
            <DialogClose render={<Button variant="success" />}>退出</DialogClose>
          </div>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
