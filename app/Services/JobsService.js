import { appState } from "../AppState.js"
import { JobsController } from "../Controllers/JobsController.js"
import { Job } from "../Models/Job.js"
import { Pop } from "../Utils/Pop.js"
import { SandboxServer } from "./AxiosService.js"

class JobsService {
  setActiveJob(id) {
    debugger
    const job = appState.jobs.find(j => j.id == id)
    // @ts-ignore
    appState.activeJob = job

  }
  async deleteJob(id) {
    const confirm = await Pop.confirm('You fr?')
    if (!confirm) { return }
    // debugger
    await SandboxServer.delete(`/api/jobs/${id}`)
    let a = appState.jobs.filter(j => j.id != id)
    appState.jobs = a
    console.log('yo');
    appState.emit('jobs')
  }
  async addJob(formData) {
    // debugger
    // let job = new Job(formData)

    const res = await SandboxServer.post('/api/jobs', formData)

    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)

    const newJob = new Job(res.data)
    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, newJob)
    appState.emit('jobs')
  }

  // async getCars() {
  //   const res = await SandboxServer.get('/api/cars')
  //   appState.cars = res.data.map(banana => new Car(banana))
  // }
  async getJobs() {
    // debugger
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
    console.log(appState.jobs)
  }

  async addCar() {
    const res = await SandboxServer.post()
  }

}
export const jobsService = new JobsService