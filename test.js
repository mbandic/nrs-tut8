let server = "http://localhost:8200";
let chai = require("chai");
let chaiHttp = require("chai-http");
let mocha = require("mocha");
chai.use(chaiHttp);
let sqlite3 = require("sqlite3").verbose();
let should = chai.should();

/* let db = new sqlite3.Database("./baza.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the baza.db database.");
  });

chai.should()
chai.use(chaiHttp) */

describe("Testovi", () => {
  beforeEach(function () {});

  it("treba vratiti 200 i json za GET /gradovi", (done) => {
    chai
      .request(server)
      .get("/gradovi")
      .end((err, res) => {
        //console.log(res);
        res.should.have.status(200);
        res.should.to.be.json;
        done();
      });
  });

  it("treba vratiti kod 200 i uspjesno PUT prodje", (done) => {
    chai
      .request(server)
      .put("/gradovi/2")
      .end((err, res) => {
        res.should.have.status(200);
        //console.log(res);
        res.header["content-type"].should.be.equal(
          "application/json; charset=utf-8"
        );
        done();
      });
  });

  it("vrati 200 za DLT", (done) => {
    chai
      .request(server)
      .get("/gradovi/1")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("200 i poruka da je proslo", (done) => {
    chai
      .request(server)
      .post("/grad")
      .send({ naziv: "sdf", broj_stanovnika: 12345 })
      .end((err, res) => {
        res.should.have.status(200);
        res.header["content-type"].should.be.equal(
          "application/json; charset=utf-8"
        );
        done();
      });
  });

  it("200 i json", (done) => {
    chai
      .request(server)
      .get("/gradovi/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;

        res.body.length.should.not.be.eql(0);
        done();
      });
  });

  afterEach(function () {});
});
