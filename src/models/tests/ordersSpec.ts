import {orderStore} from '../orders';

const store = new orderStore();
describe('Student Model',()=>{
    it('should have index method defined',()=>{
        expect(store.index).toBeDefined();
    });
    it('should return array of data ',async()=>{
        const result = await store.index();
        expect(result).toEqual([]);
    })
});