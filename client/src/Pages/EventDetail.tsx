import "./Style/eventDetail.css";

export default function EventDetail() {
  return (
    <div>
      <h1>이벤트 제목</h1>
      <span>2023.01.10</span>

      <div>
        <img src="https://picsum.photos/1000/500" alt="sample image"></img>
      </div>

      <div>
        <span>종료: 2023.02.03</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id repellat
          sed quaerat exercitationem enim dolore ratione dolorem? Odio ab
          temporibus excepturi, at neque, consequatur aliquam labore, mollitia
          error perspiciatis vero!
        </p>
      </div>
    </div>
  );
}
