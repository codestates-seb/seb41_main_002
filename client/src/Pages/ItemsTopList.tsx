import React, { useEffect, useState } from "react";
import { TopProductData } from "../API/ItemTopList/getTopList";
import { getTopList } from "../API/ItemTopList/getTopList";
import TopListCategoryTab from "../Components/ItemTopList/TopListCategoryTab";
import TopProductList from "../Components/ItemTopList/TopProductList";
import "./Style/itemsTopList.css";

export default function ItemsTopList() {
  const [category, setCategory] = useState<string>("전체");
  const [categoryENName, setCategoryENName] = useState("");
  const [topProductData, setTopProductData] = useState<TopProductData[]>([]);

  const topProductList = async () => {
    const result = await getTopList(categoryENName);
    setTopProductData(result);
  };

  useEffect(() => {
    topProductList();
  }, [categoryENName]);

    // 더미 session
    const session = {
      memberId: 1,
      accountId: "abc",
    };

  return (
    <div>
      <h2 className="Top_List_Title">이 달의 Top 10 {category}</h2>
      <div className="Tab_Container">
        <ul className="Filter_Options">
          <TopListCategoryTab
            setCategory={setCategory}
            setCategoryENName={setCategoryENName}
            session={session}
          />
        </ul>
      </div>
      <div className="Products_Gallery">
        <ul className="Products_Row">
          <TopProductList topProductData={topProductData} />
        </ul>
      </div>
    </div>
  );
}
