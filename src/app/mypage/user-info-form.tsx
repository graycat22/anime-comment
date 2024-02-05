"use client";

import { deleteApiKey, updateUser } from "@/utils/actions";

//!------- まずは Server Actions で書いてみます-------------------------

const UserInfoForm = () => {
  const handleClickHide = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form action={""}>
        <div>
          <div>
            <label>なまえ</label>
            <button
              onClick={handleClickHide}
              className="p-2 m-3 bg-gray-300 rounded-md"
            >
              隠す
            </button>
            <input className="border-2 rounded-lg" />
          </div>
          <div>
            <label>Annict の API KEY</label>
            <button
              onClick={handleClickHide}
              className="p-2 m-3 bg-gray-300 rounded-md"
            >
              隠す
            </button>
            <input className="border-2 rounded-lg" />
          </div>
          <div>
            <label></label>
            <button
              onClick={handleClickHide}
              className="p-2 m-3 bg-gray-300 rounded-md"
            >
              隠す
            </button>
            <input className="border-2 rounded-lg" />
          </div>
        </div>
        <div>
          <button type="submit" className="p-2 m-3 bg-gray-300 rounded-md">
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
