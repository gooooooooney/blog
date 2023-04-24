"use client"

import { useState } from "react";
import { redirect } from 'next/navigation';
import { Button, Label, TextInput } from "./ui/Flowbite";


const ModalLogin = () => {

  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    window.location.href=window.location.href.split("?")[0] + "?password=" + encodeURIComponent(password);
  }
  const keyDownEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 border border-[#37352f29] dark:border-[#ffffff21] border-solid p-4 rounded-sm">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        请输入密码
      </h3>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your password"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          onChange={handleChange}
          onKeyDown={keyDownEvent}
          value={password}
          required={true}
        />
      </div>
      <div className="w-full">
        <Button onClick={handleSubmit}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default ModalLogin;
