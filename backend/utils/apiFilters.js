class apiFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchResults() {
    const search = this.queryStr.search
      ? {
          title: { $regex: this.queryStr.search, $options: "i" },
        }
      : {};
    console.log("🚀 ~ apiFilter ~ searchResults ~ search:", search);

    this.query = this.query.find({ ...search });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };
    const fieldsToRemove = ["search", "page"];
    fieldsToRemove.forEach((field) => delete queryCopy[field]);
    let queryStr = JSON.stringify(queryCopy);
    console.log("🚀 ~ apiFilter ~ filters ~ queryStr:", queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
  }
}
export default apiFilter;
