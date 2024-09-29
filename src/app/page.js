import { Footer } from "flowbite-react";

export default function Home() {
  return (
    <div className="w-creen h-full">
      <nav className="drop-shadow-sm text-white px-80 bg-almostBlack py-4 cursor-pointer flex flex-row justify-start items-center">
        <h1 className="text-xl">
          <span className="text-3xl text-babyPink">
            <u>
              <strong>Enamorados</strong>:
            </u>
          </span>{" "}
          Celebrate your love in a unique way! ❤️
        </h1>
      </nav>
      <div className="px-80 w-full h-full text-white bg-gradient-to-br from-almostBlack to-mySlate">
        {/* Stuff here */}
      </div>
      <h5 className="text-5xl font-bold">Everlasting Memento</h5>
      <Footer className="bg-mySlate shadow-2xl" container>
        <Footer.Copyright
          href="#"
          by="Enamorados"
          className="text-white"
          year={2024}
        />
        <Footer.LinkGroup>
          <Footer.Link className="text-white" href="/home">
            Home
          </Footer.Link>
          <Footer.Link className="text-white" href="#">
            How does it work?
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}
