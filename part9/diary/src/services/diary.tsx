import axios from "axios";
import { Diary } from "../App";

const baseUrl = 'http://localhost:3001/api/diaries'

async function getAll() {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

async function create(obj: Diary) {
  console.log('obj:', obj)
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const diaryService = {
  getAll,
  create
}

export default diaryService
