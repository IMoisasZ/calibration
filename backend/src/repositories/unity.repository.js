import { UnityModel } from '../models/__index.js'

async function createUnity(unity) {
	return await UnityModel.create(unity)
}

async function updateUnity(id, unity) {
	const unityInstance = await getUnity(id)

	unityInstance.description = unity.description
	unityInstance.tag = unity.tag
	unityInstance.active = unity.active

	return await unityInstance.save()
}

async function getAllUnity(whereClause) {
	return await UnityModel.findAll({
		where: whereClause,
	})
}

async function getUnity(id) {
	return await UnityModel.findByPk(id)
}

async function updateUnityStatus(id, active) {
	await UnityModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getUnity(id)
}

export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
