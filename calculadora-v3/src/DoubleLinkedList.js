const CAPACITY = 10;

class Node {
  constructor(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

export class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.capacity = CAPACITY;
    this.current = null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else if (this.size !== this.capacity) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      this.size++;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;

      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.current = null;
  }

  up() {
    if (!this.head) return null;

    if (!this.current) {
      this.current = this.head;
    } else if (this.current.next) {
      this.current = this.current.next;
    }

    return this.current.data;
  }

  down() {
    if (!this.head) return null;

    if (!this.current) {
      this.current = this.head;
    } else if (this.current.prev) {
      this.current = this.current.prev;
    }

    return this.current.data;
  }

  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result);
  }
}
