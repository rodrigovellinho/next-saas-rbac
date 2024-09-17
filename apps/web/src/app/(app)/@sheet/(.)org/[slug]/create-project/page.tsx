import { InterceptedSheetContent } from '@/src/components/intercepeted-sheet.content'
import { Sheet, SheetHeader, SheetTitle } from '@/src/components/ui/sheet'

import { ProjectForm } from '../../../../org/[slug]/create-project/project-form'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
