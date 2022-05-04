function Create() {
  return (
    <>
      <div className="content">
        <div className="formContainer ">
          <header>
            <p className="pageHeader">Create Listing</p>
          </header>
          <form className="">
            <header>
              <h2 className="smallHeader">Item Info</h2>
            </header>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel3">Product Name</span>
                <input
                  type="text"
                  placeholder="Name of Product"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <div>
                <label className="input-group pb-0.5">
                  <span className="formLabel2">Category</span>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Goods</span>
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-orange-500"
                        checked
                      />
                    </label>

                    <label className="label cursor-pointer">
                      <span className="label-text">Service</span>
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-green-500"
                        checked
                      />
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label className="input-group pb-12">
                <span className="formLabel">Description</span>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Brief product description"
                ></textarea>
              </label>
            </div>
            <header>
              <h2 className="smallHeader"> Selling Info</h2>
            </header>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel4">Unit</span>
                <input
                  type="text"
                  placeholder="Unit(per hour, per item, per pound)"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group pb-20">
                <span className="formLabel">Price</span>
                <input
                  type="text"
                  placeholder="20"
                  className="input input-bordered w-full"
                />
                <span>
                  <select className="select select-ghost max-w-xs">
                    <option disabled selected>
                      USD
                    </option>
                    <option>EUR</option>
                  </select>
                </span>
              </label>
            </div>

            {/* UPLOADER FOR IMAGE */}

            <div>
              <button class="btn btn-primary">Create on Blockchain</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
