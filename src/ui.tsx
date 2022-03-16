import {
  Button,
  Columns,
  Container,
  render,
  Text,
  Textbox,
  VerticalSpace,
  Toggle,
  Divider,
  TextboxAutocomplete,
  TextboxAutocompleteOption,
  FileUploadDropzone
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks'

import { splitImageAsync } from './utilities/split-image-async.js'


import { CloseHandler, CreateThumbnailHandler,
  DropImagesHandler,
  DroppedImage,
  InsertBigImageHandler,
   } from './types'



function Plugin() {

  // handle image uploaded files 


  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)

  // accepted file uploads
  const acceptedFileTypes = ['image/x-png','image/jpeg']

  const [project, setProject] = useState('');
   function handleProjectInput(event: JSX.TargetedEvent<HTMLInputElement>) {
   const newValue = event.currentTarget.value
   setProject(newValue)
 }

 const [status, setStatus] = useState('');
 function handleStatus(event: JSX.TargetedEvent<HTMLInputElement>) {
 const newValue = event.currentTarget.value
 setStatus(newValue)
}

  
  const handleSelectedFiles = useCallback(
    async function (files: Array<File>) {
      const total = files.length
      setTotal(total)
      let index = 0
      for (const file of files) {
        const images = await splitImageAsync(file)
        const name = trimExtension(file.name) 
        console.log(images)
        emit<CreateThumbnailHandler>('CREATE_THUMBNAIL', project, images, {
          done: index === total - 1,
          name
        })
        setIndex(index)
        index += 1
      }
    },
    [setIndex, setTotal]
  )

  
  useEffect(
    function () {
      return on<DropImagesHandler>(
        'DROP_IMAGES',
        async function (droppedImages: Array<DroppedImage>) {
          const files: Array<File> = []
          for (const droppedImage of droppedImages) {
            const blob = new Blob([droppedImage.bytes], {
              type: droppedImage.type
            })
            const file = new File([blob], droppedImage.name)
            files.push(file)
          }
          await handleSelectedFiles(files)
        }
      )
    },
    [handleSelectedFiles]
  )

  function trimExtension(fileName: string): string {
    return fileName.substring(0, fileName.lastIndexOf('.'))
  }
  
const options: Array<TextboxAutocompleteOption> = [
    { value: 'In Progress' },
    { value: 'Ready for Dev' },
    { value: 'Ready for Feedback' },
    { value: 'Completed' },
    { value: 'Outdated/Archive' }
  ]
  
  // const handleCreateRectanglesButtonClick = 
  //   function () {
  //       emit<CreateThumbnailHandler>('CREATE_THUMBNAIL', project )
  //   }


  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])
  return (
 
    <Container>
      <VerticalSpace space="extraLarge"></VerticalSpace>
      <Text>Preview</Text>

      <VerticalSpace space="extraLarge"></VerticalSpace>
      <VerticalSpace space="extraLarge"></VerticalSpace>
      <VerticalSpace space="extraLarge"></VerticalSpace>
      <VerticalSpace space="extraLarge"></VerticalSpace>

       <VerticalSpace space="extraLarge"></VerticalSpace>
       <Text>Project Name</Text>
       <VerticalSpace space="small"></VerticalSpace>
       <Textbox onInput={handleProjectInput} placeholder="e.g Company design system" value={project} />
       <VerticalSpace space="extraLarge"></VerticalSpace>
       <Text>Project Status</Text>

       <VerticalSpace space="small"></VerticalSpace>
       <TextboxAutocomplete
    onInput={handleStatus}
    placeholder="In Progress"
      options={options}
      value={status}
    />
<VerticalSpace space="extraLarge"></VerticalSpace>

<Text>Add collaborators</Text>
<VerticalSpace space="small"></VerticalSpace>
   <FileUploadDropzone  acceptedFileTypes={acceptedFileTypes} onSelectedFiles={handleSelectedFiles}>
     <Text align="center" muted>
        +
      </Text>
   </FileUploadDropzone>
   <VerticalSpace space="extraLarge"></VerticalSpace>
       <Button fullWidth >
          Create thumbnail
        </Button>
       </Container>
  )
}

export default render(Plugin)
