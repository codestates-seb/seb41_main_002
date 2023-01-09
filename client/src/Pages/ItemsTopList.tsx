import "./Style/ItemsTopList.css";

export default function ItemsTopList() {
  return (
    <div>
      <h2 className="Top_List_Title">이 달의 Top 10 </h2>
      <ul className="Filter_Options">
        <li>
          <button className="Filter_Button">토너</button>
        </li>
        <li>
          <button className="Filter_Button">에센스</button>
        </li>
        <li>
          <button className="Filter_Button">로션</button>
        </li>
        <li>
          <button className="Filter_Button">크림</button>
        </li>
      </ul>
      <div className="Products_Gallery">
        {/* 아래 상품들은 이후 데이터를 활용한 .map 방식으로 구성할 예정 */}
        <ul className="Products_Row">
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=1"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=2"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=3"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=4"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
        </ul>
        <ul className="Products_Row">
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=5"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=6"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=7"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=8"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
