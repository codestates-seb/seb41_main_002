import "./Style/eventDetail.css";

export default function EventDetail() {
  return (
    <div>
      <h1 className="Event_Title">이벤트 제목</h1>
      <div className="Event_Posted_Date">2023.01.10</div>

      <div className="Event_Image">
        <img src="https://picsum.photos/1000/500" alt="sample image"></img>
      </div>

      <div>
        <div className="Event_Term">
          기간:
          <span>2023.01.10</span> ~ <span>2023.02.03</span>
        </div>
        <div className="Event_Detail">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
            repellat sed quaerat exercitationem enim dolore ratione dolorem?
            Odio ab temporibus excepturi, at neque, consequatur aliquam labore,
            mollitia error perspiciatis vero! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Id repellat sed quaerat exercitationem
            enim dolore ratione dolorem? Odio ab temporibus excepturi, at neque,
            consequatur aliquam labore, mollitia error perspiciatis vero!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
            repellat sed quaerat exercitationem enim dolore ratione dolorem?
            Odio ab temporibus excepturi, at neque, consequatur aliquam labore,
            mollitia error perspiciatis vero! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Id repellat sed quaerat exercitationem
            enim dolore ratione dolorem? Odio ab temporibus excepturi, at neque,
            consequatur aliquam labore, mollitia error perspiciatis vero!
          </p>
        </div>
      </div>
    </div>
  );
}
