"use client"

import { motion } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  initials: string
}

const patrons: TeamMember[] = [
  { name: "Dr. S. N. V. L. Narasimha Raju", role: "Chief Patron", initials: "SR" },
  { name: "Dr. Rakesh S. G.", role: "Patron", initials: "RS" },
  { name: "Dr. R. Kanagavalli", role: "Convenor", initials: "RK" },
]

const facultyCoordinators: TeamMember[] = [
  { name: "Dr. K. Valarmathi", role: "Faculty Coordinator", initials: "KV" },
  { name: "Dr. C. A. Bindyashree", role: "Faculty Coordinator", initials: "CB" },
  { name: "Dr. S. Vidhya", role: "Faculty Coordinator", initials: "SV" },
  { name: "Ms. Asha Kumari", role: "Faculty Coordinator", initials: "AK" },
  { name: "Ms. Manjula", role: "Faculty Coordinator", initials: "MJ" },
]

const studentCoordinators: TeamMember[] = [
  { name: "Mr. Tarun Anand R.", role: "Student Coordinator", initials: "TA" },
  { name: "Mr. Jeevan G.", role: "Student Coordinator", initials: "JG" },
  { name: "Ms. Sreevidya V.", role: "Student Coordinator", initials: "SV" },
  { name: "Ms. Srusti K. R.", role: "Student Coordinator", initials: "SK" },
]

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, borderColor: "#FFD700" }}
      className="bg-card rounded-xl p-6 border border-yellow-400/15 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.12)]"
    >
      {/* Avatar */}
      <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-yellow-400/30 to-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mb-4">
        <span className="text-lg font-bold text-yellow-400">{member.initials}</span>
      </div>

      {/* Name */}
      <h3 className="font-bold text-foreground text-sm mb-1">{member.name}</h3>

      {/* Role */}
      <p className="text-xs text-yellow-400 uppercase tracking-wider">{member.role}</p>
    </motion.div>
  )
}

function TeamSection({
  title,
  members,
  startIndex = 0,
}: {
  title: string
  members: TeamMember[]
  startIndex?: number
}) {
  return (
    <div className="mb-12">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm font-mono text-yellow-400 uppercase tracking-[0.2em] mb-8"
      >
        {title}
      </motion.h3>
      <div className={`grid gap-6 ${
        members.length <= 3 
          ? "sm:grid-cols-3 max-w-3xl mx-auto" 
          : members.length === 4 
          ? "sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto" 
          : "sm:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto"
      }`}>
        {members.map((member, index) => (
          <TeamCard key={member.name} member={member} index={startIndex + index} />
        ))}
      </div>
    </div>
  )
}

export function Team() {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            <span className="text-foreground">The Team Behind </span>
            <span className="text-primary">ANOKHA</span>
          </h2>
          <p className="text-muted-foreground">
            The people who make ANOKHA 2026 happen.
          </p>
        </motion.div>

        {/* Team Sections */}
        <TeamSection title="Patrons & Convenors" members={patrons} startIndex={0} />
        <TeamSection title="Faculty Coordinators" members={facultyCoordinators} startIndex={3} />
        <TeamSection title="Student Coordinators" members={studentCoordinators} startIndex={8} />
      </div>
    </section>
  )
}
