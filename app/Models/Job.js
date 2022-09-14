export class Job {
  constructor(data) {
    this.id = data.id
    this.jobTitle = data.jobTitle
    this.description = data.description
    this.rate = data.rate
    this.hours = data.hours
    this.company = data.company
  }

  get JobCardTemplate() {
    return `
    <div class="col-md-4 col-lg-3 mb-3"> 
      <div class="card bg-secondary elevation">
        <div class="card-body ">
          <h5 class="text-uppercase">
            ${this.jobTitle}
          </h5>
          <p>
            <strong>${this.company} | $${this.rate}/hr | ${this.hours} hrs/wk</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }

  /**@param {Job} [editable] */
  static getJobForm(editable) {
    editable = editable || new Job({ description: '', hours: 0, jobTitle: '', rate: 0, company: '' })

    return `
      <form onsubmit="app.jobsController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="jobTitle" required minlength="3" maxlength="20" value="${editable.jobTitle}">
          <label for="jobTitle">Job Title</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="company" required min="1886" max="9999" value="${editable.company}">
          <label for="company">Company</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="rate" required value="${editable.rate}">
          <label for="rate">Rate</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="hours" required min="0" value="${editable.hours}">
          <label for="hours">hours</label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description}</textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>
      `
  }


  get JobListingButton() {
    return `
          <button class="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#rightBar"
            onclick="app.jobsController.addJob()">Add Job!</button>
`
  }
}