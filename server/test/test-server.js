import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

// const should = chai.should();

chai.use(chaiHttp);

describe('Routes', () => {
  it('should get 200 response from /api/auth GET', (done) => {
    chai.request(server)
    .get('/blobs')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});
