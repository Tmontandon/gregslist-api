import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js"

function _drawJobs() {
  // debugger
  let template = ''
  appState.jobs.forEach(j => template += j.JobCardTemplate)
  setHTML('listings', template)
  console.log("_drawJobs works");

  // _drawJobsButton()
}

function _drawJobsButton() {
  let template = ''
  appState.jobs.find(j => template += j.JobListingButton)
  setHTML('listing-button', template)
}

export class JobsController {
  constructor() {
    appState.on('jobs', _drawJobs)
    appState.on('jobs', _drawJobsButton)
    this.showJobs()
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }

      // HOW DO I KNOW IF I AM EDITING OR CREATING ?
      // if (appState.activeCar) {
      // NOTE to edit api
      //   await carsService.editCar(formData)
      // } else {
      // NOTE to add to api
      //   await carsService.addCar(formData)
      // }

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error(error)
      // Pop.error(error)
    }
  }


  addJob() {
    // @ts-ignore
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML('forms', template)
  }

  showJobs() {
    this.getJobs()
    // setHTML('listing-button', Job.getJobListingButton)
    setHTML('forms', Job.getJobForm())
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error(error);
    }
  }

  async deleteJob(id) {
    try {
      jobsService.deleteJob(id)
    } catch (error) {
      console.error(error);
    }

  }
  beginEdit(id) {
    jobsService.setActiveJob(id)
    const activeJob = appState.activeJob
    const template = Job.getJobForm(activeJob)

    setHTML('forms', template)
  }
}