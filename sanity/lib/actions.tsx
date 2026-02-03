import { createCampaign } from "@/app/actions";
import { EnvelopeIcon } from "@sanity/icons";
import { DocumentActionProps } from "sanity";

export default function sendMails({ draft, published, onComplete }: DocumentActionProps) {
   
    const handleAction = async (formData: FormData) => {
      const documentData = draft || published
      if (!documentData) {
        alert("Žádná data nejsou k dispozici")
        onComplete()
        return
      }
      createCampaign()
    }
  
    return {
      label: "Rozeslat newsletter",
      onHandle: handleAction,
      icon: EnvelopeIcon,
    }
  }