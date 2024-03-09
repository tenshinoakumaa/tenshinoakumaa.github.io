import { makeAutoObservable } from 'mobx';

class CounterStore {
  groups = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGroups() {
    try {
      this.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('./groups.json');
      const data = await response.json();
      this.groups = data;
      console.log
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(value) {
    this.loading = value;
  }
}

const counterStore = new CounterStore();
export default counterStore;
