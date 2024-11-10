'use client'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; 
import { Plus, X, Copy, Upload } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "./components/Header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface TeamMember {
  id: number
  name: string
  year: string
  libId: string
  email: string
  number: string
  gender: string
}

interface Team {
  id: number
  name: string
  members: TeamMember[]
}

export default function Component() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: '',
      members: [
        {
          id: 1,
          name: '',
          year: '',
          libId: '',
          email: '',
          number: '',
          gender: ''
        }
      ]
    }
  ])

 

  const addTeamMember = (teamId: number) => {
   console.log(teams[0].members.length)
    if(teams[0].members.length < 4) {

    setTeams(teams.map(team => 
      team.id === teamId
        ? {
            ...team,
            members: [
              ...team.members,
              {
                id: team.members.length + 1,
                name: '',
                year: '',
                libId: '',
                email: '',
                number: '',
                gender: ''
              }
            ]
          }
        : team
    ))
  }
  }

  const removeTeamMember = (teamId: number, memberId: number) => {
    setTeams(teams.map(team => 
      team.id === teamId
        ? {
            ...team,
            members: team.members.length > 1
              ? team.members.filter(member => member.id !== memberId)
              : team.members
          }
        : team
    ))
  }

  const handleTeamNameChange = (teamId: number, value: string) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name: value } : team
    ))
  }

  const handleMemberChange = (teamId: number, memberId: number, field: keyof TeamMember, value: string) => {
    setTeams(teams.map(team => 
      team.id === teamId
        ? {
            ...team,
            members: team.members.map(member => 
              member.id === memberId ? { ...member, [field]: value } : member
            )
          }
        : team
    ))
  }


  const [isOpen, setIsOpen] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)

  const upiId = 'example@upi'

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId)
      .then(() => alert('UPI ID copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setScreenshot(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      // Check if screenshot exists to update payment status
      const paymentStatus = screenshot ? true : false;
  
      // Upload the screenshot to Firebase Storage
      let screenshotUrl = '';
      if (screenshot) {
        const storage = getStorage();
        const screenshotRef = ref(storage, `payments/${screenshot.name}`);
        const uploadTask = uploadBytesResumable(screenshotRef, screenshot);
  
        // Wait for the upload to complete
        await uploadTask;
  
        // Get the download URL of the uploaded screenshot
        screenshotUrl = await getDownloadURL(screenshotRef);
      }
  
      // Prepare the team data to send to Firestore
      const teamData = {
        teamName: teams[0].name, // Team name
        email: teams[0].members[0].email, // Leader's email
          paymentStatus: paymentStatus, // Payment status
          paymentScreenshotUrl: screenshotUrl, // URL of the uploaded screenshot
        teamLeader: {
          ...teams[0].members[0], // First member as the team leader
          teamName: teams[0].name, // Team name
          
        },
        teamMembers: teams[0].members.slice(1).map((member) => ({
          ...member,
        })),
        transactionId: transactionId, // Transaction ID
        isPaymentVerified: false, // Default value
      };
  
      // Save team data to Firestore
      await addDoc(collection(db, "registrations"), teamData);
  
      alert("Team data saved successfully!");
      setIsOpen(false);
  
      // Reset form fields
      setTransactionId("");
      setScreenshot(null);
      setTeams([
        {
          id: 1,
          name: "",
          members: [
            {
              id: 1,
              name: "",
              year: "",
              libId: "",
              email: "",
              number: "",
              gender: "",
            },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error saving team data: ", error);
      alert("Failed to save team data.");
    }
  };
  


  return (
    <div className="relative bg-[#04000A] overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none z-0"></div>

    {/* Content */}
    <div className="relative z-10">
      <Header />
    <div className={`flex ${teams[0].members.length > 1 && 'md:pt-[8rem]'} pt-[4rem] hode items-center`}>
      <div className="w-[40%] p-8 md:flex  hidden items-center justify-center h-screen">
        <img className="w-[70%] sticky flex items-center justify-center" src="IdeateX_Logo.png" alt="" />
      </div>
      <div className="md:w-[60%]  w-full md:p-8 p-6 pt-10 md:pt-8  flex items-center justify-center">
      <Card className="w-full  mx-auto bg-gray-950 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Team Registration Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {teams.map((team) => (
          <div key={team.id} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id={`teamName-${team.id}`}
                value={team.name}
                onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                className="block z-8 px-4 py-3 w-full text-white-100 bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                placeholder="Team Name"
              />
              <label
                htmlFor={`teamName-${team.id}`}
                className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
              >
                Team Name
              </label>
            </div>
          
            {team.members.map((member, index) => (
              <div key={member.id} className="space-y-4 relative">
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTeamMember(team.id, member.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-bold">Team Member {index+1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id={`name-${team.id}-${member.id}`}
                      value={member.name}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'name', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                      placeholder="Name"
                    />
                    <label
                      htmlFor={`name-${team.id}-${member.id}`}
                      className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id={`year-${team.id}-${member.id}`}
                      value={member.year}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'year', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                      placeholder="Year"
                    />
                    <label
                      htmlFor={`year-${team.id}-${member.id}`}
                      className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Year
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id={`libId-${team.id}-${member.id}`}
                      value={member.libId}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'libId', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                      placeholder="Library ID"
                    />
                    <label
                      htmlFor={`libId-${team.id}-${member.id}`}
                      className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Library ID
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id={`email-${team.id}-${member.id}`}
                      value={member.email}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'email', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                      placeholder="Email"
                    />
                    <label
                      htmlFor={`email-${team.id}-${member.id}`}
                      className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      id={`gender-${team.id}-${member.id}`}
                      value={member.gender}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'gender', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
>
                      <option value="" disabled hidden>
                      Select Gender
                    </option>
                    <option className="" value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      id={`number-${team.id}-${member.id}`}
                      value={member.number}
                      onChange={(e) => handleMemberChange(team.id, member.id, 'number', e.target.value)}
                      className="block px-4 py-3 w-full text-white bg-gray-900 border-2 border-gray-800 rounded-lg focus:border-primary peer placeholder-transparent"
                      placeholder="Contact Number"
                    />
                    <label
                      htmlFor={`number-${team.id}-${member.id}`}
                      className="absolute left-2 -top-2.5 bg-gray-950 px-2 text-sm text-white transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-primary"
                    >
                      Contact Number
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <Button
              onClick={() => addTeamMember(team.id)}
              variant="outline"
              className={`w-full ${teams[0].members.length === 4 && 'hidden'} border-dashed border-2 border-gray-700 hover:border-primary hover:bg-gray-900`}
            >
              <Plus className="mr-2 h-4 w-4 " />
              Add Team Member
            </Button>
          </div>
        ))}

      
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button className="w-full py-6 bg-white hover:scale-105 transition-all ease-linear text-base hover:bg-white text-black">
      Next
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]">
    <DialogHeader>
      <DialogTitle>Complete Payment</DialogTitle>
    </DialogHeader>
    <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-64 w-64 bg-gray-200 flex items-center justify-center">
          {/* Replace with actual QR code */}
          <span className="text-gray-500">QR Code</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-white">{upiId}</span>
          <Button size="icon" variant="ghost" onClick={handleCopy}>
            <Copy className="h-4 w-4 text-white" />
            <span className="sr-only text-white">Copy UPI ID</span>
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="transactionId" className="text-white">Transaction ID</label>
          <input
            id="transactionId"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="w-full p-2 border border-gray-400 rounded-md bg-gray-800 text-white placeholder-gray-400"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="screenshot" className="text-white">Upload Payment Screenshot</label>
          <div className="flex items-center space-x-2">
            <input
              id="screenshot"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('screenshot')?.click()}
              className="text-white border-white hover:bg-gray-700"
            >
              <Upload className="mr-2 h-4 w-4 text-white" />
              {screenshot ? 'Change File' : 'Choose File'}
            </Button>
            {screenshot && <span className="text-sm text-white">{screenshot.name}</span>}
          </div>
        </div>
        <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700">
          Complete Registration
        </Button>
      </form>
    </div>
  </DialogContent>
</Dialog>

      </CardContent>
    </Card>
      </div>
      </div>
      </div>
      </div>

    
  )
}