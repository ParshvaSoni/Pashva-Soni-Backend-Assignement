import chai from "chai";
import chaiHttp from "chai-http";
import server from '../server.js'


const expect = chai.expect;
const should = chai.should()

chai.use(chaiHttp)
describe('=> Product Routes API Testing',()=>{
    it('1) Testing Get All Products Route...',(done)=>{
        chai.request(server)
            .get('/products/all')
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.data.should.be.a('array');
                let actualMessage = res.body.message;
                expect(actualMessage).to.be.equal('Products Retrieved Successfully.')
                done();
            })
    })

    it('2) Testing Get Product By ID Route...',(done)=>{
        chai.request(server)
            .get('/products/123456789')
            .end((err,res)=>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                let actualMessage = res.body.message;
                expect(actualMessage).to.be.equal('Invalid Product-ID.')
                done();
            })
    })

    let productID;
    it('3) Testing Create New Product Route...',(done)=>{
        chai.request(server)
        .post('/products/create')
        .send({title:"My Testing Product Title1",description:"This is description of my test product",imageURL:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",price:5000,category:"toys"})
        .end((err,res)=>{
            productID=res.body.data?._id || "123456789";
            res.should.be.a('object');
            expect(res.status).to.be.oneOf([200,406]);
            expect(res.body.message).to.be.oneOf(['Product with the given name already exist.','Product created successfully.']);
            done();
        })
    })

    it('4) Testing Update Existing Product Route...',(done)=>{
        chai.request(server)
            .patch(`/products/update/${productID}`)
            .send({title:"My Testing Product Title1",description:"This is Updated description of my test product",imageURL:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",price:12000,category:"toys"})
            .end((err,res)=>{
                res.should.be.a('object');
                expect(res.status).to.be.oneOf([202,406,400]);
                expect(res.body.message).to.be.oneOf(['Product with the given name already exist.','Product Updated successfully.',"Invalid Product-ID."]);
                done();
            })
    })
    it('5) Testing Delete Existing Product Route...',(done)=>{
        chai.request(server)
            .delete(`/products/delete/${productID}`)
            .end((err,res)=>{
                res.should.be.a('object');
                expect(res.status).to.be.oneOf([200,404,400]);
                expect(res.body.message).to.be.oneOf(['Product with the given name already exist.','Product deleted successfully.',"Invalid Product-ID.","No Product with this ID available."]);
                done();
            })
    })
    it('6) Testing Non Existing Product Route...',(done)=>{
        chai.request(server)
            .delete(`/products/unknown`)
            .end((err,res)=>{
                res.should.have.status(404);
                res.body.should.be.a('object');
                let actualMessage = res.body.message;
                expect(actualMessage).to.be.equal("We didn't find what you are looking for !")
                done();
            })
    })
})