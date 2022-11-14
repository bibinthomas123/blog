import "./write.css";
// import Image from "react-bootstrap/Image"

export default function Write() {
  return (
    <>
      <div className="write">
      <form action="post">
        <section class="container-fluid bg-gray">
          <div class="container mb-2  ">
            <div class="input-group input-group-lg parent ">
              <input
                type="text"
                className="  form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="Title"
              ></input>
              <input
                type="text"
                className="  form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="category"
              ></input>
            </div>
          </div>
        </section>
        <section class="container">
          <div class="input-group">
            <textarea
              class="form-control textwrite"
              rows="10"
              type="textarea"
              placeholder="Tell us your story.. :)"
            ></textarea>
          </div>
        <button type="submit" class="btn btn-primary my-3">Submit</button>
        </section>
      </form>
      </div>
    </>
  );
}
