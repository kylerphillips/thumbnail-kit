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
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { CloseHandler, CreateThumbnailHandler } from './types'



function Plugin() {

  // handle image uploaded files 
  function handleSelectedFiles(files: Array<File>) {
    console.log(files)
  }
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

const options: Array<TextboxAutocompleteOption> = [
    { value: 'In Progress' },
    { value: 'Ready for Dev' },
    { value: 'Ready for Feedback' },
    { value: 'Completed' },
    { value: 'Outdated/Archive' }
  ]
  
  const handleCreateRectanglesButtonClick = 
    function () {
        emit<CreateThumbnailHandler>('CREATE_THUMBNAIL', project)
    }


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
       <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
          Create thumbnail
        </Button>
       </Container>
  )
}

export default render(Plugin)
