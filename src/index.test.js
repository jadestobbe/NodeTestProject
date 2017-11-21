import {
    expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('index.html', () => {
    it('should have h1 say Users', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8');
        jsdom.env(index, function(err, window) {
            const h1 = window.document.getElementsByTagName('h1')[0];
            expect(h1.innerHTML).to.equal("Users");
            done();
            window.close();
        });
    });
});

/*describe('index.html', () => {
    it('should have first persons first name say Bob', (done) => {
        const index = fs.readFileSync('./src/index.html', "utf-8");
        jsdom.env(index, function(err, window) {
            const firstName = window.document.getElementsByTagName('td')[2];
            expect(firstName.innerHTML).to.equal("Bob");
            done();
            window.close();
        });
    });
});
*/
