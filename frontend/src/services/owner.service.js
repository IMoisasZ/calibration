import { API } from '../api/API'

async function createOwner(owner) {
	delete owner.id
	const { data } = await API.post(`owner`, owner)
	return data
}

async function updateOwner(owner) {
	const { id } = owner
	delete owner.id
	const { data } = await API.put(`owner/${Number(id)}`, owner)
	return data
}

async function getAllOwner(status = true) {
	const { data } = await API.get(`owner?status=${status}`)
	return data
}

async function getOwner(id) {
	const { data } = await API.get(`owner/${id}`)
	return data
}

async function updateOwnerStatus(id, active) {
	const { data } = await API.patch(`owner/${id}`, { active })
	return data
}

export { createOwner, updateOwner, getAllOwner, getOwner, updateOwnerStatus }
