/**
 * blob文件数据保存到本地
 * @param blobData
 * @param fileType
 * @param fileName
 */
export const saveFile = (blobData: Blob, fileType: string, fileName: string = 'file_' + +new Date()) => {
	let blob = new Blob([blobData], { type: fileType })
	var link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	link.click()
	//释放内存
	window.URL.revokeObjectURL(link.href)
}
