"use client";

import { useState, useEffect } from "react";
import { Users, ArrowRight, Activity } from "lucide-react";
import { trainingCourses } from "@/lib/data";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assuming we need to set this up

export default function TrainingPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("GIS-01");
  const [orgName, setOrgName] = useState<string>("");
  const [orgType, setOrgType] = useState<string>("State Authority");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [attendeeCount, setAttendeeCount] = useState<number>(10);
  const [preferredDate, setPreferredDate] = useState<string>("2026-09-15");
  const [customRequirements, setCustomRequirements] = useState<string>("");
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [trainingRequests, setTrainingRequests] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>(trainingCourses);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing requests and courses from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Courses
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        if (!coursesSnapshot.empty) {
          const fetchedCourses = coursesSnapshot.docs.map((doc) => doc.data());
          // Sort them logically (e.g. GIS-00, GIS-01...)
          fetchedCourses.sort((a, b) => (a.id > b.id ? 1 : -1));
          setCourses(fetchedCourses);
        }

        // Fetch Requests
        const q = query(collection(db, "training_requests"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrainingRequests(requests);
      } catch (err) {
        console.error("Error fetching data from Firestore:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRequestCourse = async (e: any) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    const courseDetails = courses.find((c) => c.id === selectedCourseId);
    
    // Create new request object
    const nextNum = 1000 + trainingRequests.length + 1;
    const customId = "REQ-GIS-" + nextNum;
    
    const newRequest = {
      requestId: customId,
      courseId: selectedCourseId,
      courseTitle: courseDetails ? courseDetails.title : selectedCourseId,
      orgName: orgName,
      contactEmail: contactEmail,
      orgType: orgType,
      attendeeCount: attendeeCount,
      preferredDate: preferredDate,
      customRequirements: customRequirements,
      status: "Awaiting Authority Allocation",
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "training_requests"), newRequest);
      
      // Update local state for immediate feedback
      setTrainingRequests([{ id: docRef.id, ...newRequest }, ...trainingRequests]);
      setRequestSuccess(true);
      
      // Reset form fields
      setOrgName("");
      setContactEmail("");
      setCustomRequirements("");
      setTimeout(() => setRequestSuccess(false), 5000);
    } catch (err) {
      console.error("Firestore save error:", err);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="py-16 bg-[#faf9ff] min-h-screen text-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#006ff0]/10 border border-[#006ff0]/30 px-3 py-1 rounded-full text-[#006ff0] text-xs font-bold uppercase tracking-widest mb-4">
            Institutional GIS Academy
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#001a43] mb-4">
            Enterprise Spatial Intelligence Training
          </h1>
          <p className="text-sm text-[#475467] leading-relaxed">
            Syllabi custom-tailored for regional authorities, environmental inspectors, development boards, and private utility syndicates. Register your team for our accredited programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#EAECF0] pb-4">
              <h2 className="text-lg font-bold text-[#001a43]">Accredited Syllabi Portfolio</h2>
              <span className="text-xs text-gray-500 font-mono">Showing {courses.length} programs</span>
            </div>

            <div className="flex flex-col gap-4">
              {courses.map((course) => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-left flex flex-col gap-3 group relative overflow-hidden ${
                      isSelected
                        ? "bg-white border-[#006ff0] shadow-md shadow-[#006ff0]/5"
                        : "bg-white border-[#EAECF0] hover:bg-gray-50/50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#006ff0]/10 text-[#006ff0] border border-[#006ff0]/20 text-[10px] font-mono font-bold rounded">
                          {course.id}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">{course.duration}</span>
                      </div>
                      {course.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono tracking-wide uppercase">
                          {course.badge}
                        </span>
                      )}
                      <button className="px-2 py-0.5 bg-[#006ff0] hover:bg-blue-700 text-white rounded text-[8.5px] font-extrabold uppercase tracking-tight shadow transition-colors block shrink-0 cursor-pointer">
                        Request a Demo
                      </button>
                    </div>

                    <h3 className={`text-base font-bold transition-colors ${isSelected ? "text-[#006ff0]" : "text-[#001a43] group-hover:text-[#006ff0]"}`}>
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-normal">{course.description}</p>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {course.topics.slice(0, 3).map((topic: string, i: number) => (
                          <span key={i} className="text-[9.5px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono border border-gray-200/60">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      {course.prerequisite && course.prerequisite !== "None" && (
                        <div className="text-[10px] font-mono text-[#001a43] bg-blue-50/50 px-2 py-1 rounded w-fit border border-[#006ff0]/20 flex items-center gap-1">
                          <span className="font-extrabold text-[#006ff0]">Prerequisite:</span> {course.prerequisite}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#EAECF0]/60 pt-3 mt-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px]">{course.target}</span>
                      </div>
                      <span className={`text-[11px] font-bold flex items-center gap-1 transition-colors ${isSelected ? "text-[#006ff0]" : "text-gray-400 group-hover:text-[#006ff0]"}`}>
                        <span>Syllabus Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#EAECF0] shadow-sm flex flex-col gap-5">
              <div className="border-b border-[#EAECF0] pb-4">
                <span className="text-[10px] uppercase font-bold text-[#006ff0] tracking-wider font-mono">
                  Syllabus Outline
                </span>
                <h3 className="text-lg font-bold text-[#001a43] mt-1">
                  {courses.find((c) => c.id === selectedCourseId)?.title}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {courses.find((c) => c.id === selectedCourseId)?.outline.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3 text-xs leading-normal relative">
                    <div className="font-mono font-extrabold text-[#006ff0] bg-[#006ff0]/10 px-2 py-1 rounded h-fit shrink-0">
                      {item.day}
                    </div>
                    <div className="text-gray-700 pt-1 text-left">{item.topic}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleRequestCourse} className="mt-4 pt-5 border-t border-[#EAECF0] flex flex-col gap-4">
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#001a43] mb-2">
                    Official Request Proposal & Demo Form
                  </h4>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Authorized clients and governmental boards can dispatch a secure request with targeted cohort sizing and timing specs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Client Organization / Authority Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Regional Transit & Municipal Agency"
                      value={orgName}
                      required
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-3 py-2 text-gray-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Contact Email</label>
                    <input
                      type="email"
                      placeholder="e.g., director@agency.gov"
                      value={contactEmail}
                      required
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-3 py-2 text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Organization Type</label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-2.5 py-2 text-gray-800 h-9"
                    >
                      <option value="State Authority">State Authority</option>
                      <option value="Municipal Council">Municipal Council</option>
                      <option value="Utility Provider">Utility Operator</option>
                      <option value="Environmental Ministry">Environment Dept</option>
                      <option value="Private Syndicate">Private Enterprise</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Cohort Size</label>
                    <input
                      type="number"
                      min="5"
                      max="150"
                      value={attendeeCount}
                      onChange={(e) => setAttendeeCount(Math.max(5, parseInt(e.target.value) || 5))}
                      className="bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-3 py-2 text-gray-800 h-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Program Term</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-2.5 py-2 text-gray-800 h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Selected Course</label>
                    <div className="bg-[#006ff0]/5 px-3 py-2 text-[#006ff0] border border-[#006ff0]/20 text-xs rounded h-9 font-bold font-mono text-center flex items-center justify-center">
                      {selectedCourseId}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Custom Guidelines & Spatial Focus</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Focus lab scenarios on high resolution local coordinate projection grids..."
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    className="w-full bg-white text-xs border border-[#EAECF0] focus:border-[#006ff0] focus:outline-none rounded px-3 py-2 text-gray-800 resize-none"
                  />
                </div>

                {requestSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs leading-normal font-sans text-center mt-1 animate-in fade-in zoom-in-95 duration-150">
                    ✔ Training Proposal Successfully Logged! Check the queue monitor below for live status updates.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#006ff0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer"
                >
                  Submit Info & Demo Request for {selectedCourseId}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl border border-[#EAECF0] text-left shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAECF0] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#006ff0]" />
              <h3 className="text-base font-bold text-[#001a43]">Institutional Request Queue & Pipeline Progress</h3>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#006ff0]/10 border border-[#006ff0]/20 text-[#006ff0]">
              LIVE CLOUD DISPATCH
            </span>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-gray-400 text-xs border border-dashed border-gray-200 rounded-lg animate-pulse">
              Syncing global enterprise requests...
            </div>
          ) : trainingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs border border-dashed border-gray-200 rounded-lg">
              No institutional training requests submitted in this database yet. Submit the form above to deploy a program!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-600 font-sans border-collapse">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider border-b border-[#EAECF0]">
                  <tr>
                    <th className="p-3 font-semibold">Program Request ID</th>
                    <th className="p-3 font-semibold">GIS Course Title</th>
                    <th className="p-3 font-semibold">Requesting Body</th>
                    <th className="p-3 font-semibold">Start Term</th>
                    <th className="p-3 font-semibold">Cohort size</th>
                    <th className="p-3 font-semibold">Workflow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {trainingRequests.map((req) => (
                    <tr key={req.id || req.requestId} className="hover:bg-gray-50/50">
                      <td className="p-3 font-mono font-bold text-[#006ff0]">{req.requestId || req.id}</td>
                      <td className="p-3 font-semibold text-[#001a43]">
                        {req.courseTitle}
                        <span className="block text-[10px] text-gray-500 font-normal mt-0.5">{req.courseId}</span>
                      </td>
                      <td className="p-3">
                        {req.orgName}
                        <span className="block text-[10px] text-gray-500 font-mono mt-0.5">{req.orgType}</span>
                      </td>
                      <td className="p-3 font-mono text-gray-600">{req.preferredDate}</td>
                      <td className="p-3 font-bold text-[#006ff0]">{req.attendeeCount} Seats</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700 font-mono">
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
