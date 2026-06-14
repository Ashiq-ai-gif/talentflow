export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      application_events: {
        Row: {
          actor_id: string | null
          application_id: string
          created_at: string
          from_status: Database["public"]["Enums"]["application_status"] | null
          id: string
          note: string | null
          to_status: Database["public"]["Enums"]["application_status"]
        }
        Insert: {
          actor_id?: string | null
          application_id: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["application_status"] | null
          id?: string
          note?: string | null
          to_status: Database["public"]["Enums"]["application_status"]
        }
        Update: {
          actor_id?: string | null
          application_id?: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["application_status"] | null
          id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["application_status"]
        }
        Relationships: [
          {
            foreignKeyName: "application_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_events_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_notes: {
        Row: {
          application_id: string
          author_id: string | null
          body: string
          created_at: string
          id: string
        }
        Insert: {
          application_id: string
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
        }
        Update: {
          application_id?: string
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          candidate_id: string
          cover_note: string | null
          created_at: string
          id: string
          job_id: string
          match_band: Database["public"]["Enums"]["match_band"] | null
          match_score: number | null
          rating: number | null
          recruiter_id: string | null
          status: Database["public"]["Enums"]["application_status"]
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          candidate_id: string
          cover_note?: string | null
          created_at?: string
          id?: string
          job_id: string
          match_band?: Database["public"]["Enums"]["match_band"] | null
          match_score?: number | null
          rating?: number | null
          recruiter_id?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          cover_note?: string | null
          created_at?: string
          id?: string
          job_id?: string
          match_band?: Database["public"]["Enums"]["match_band"] | null
          match_score?: number | null
          rating?: number | null
          recruiter_id?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "hiring_funnel"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          answers: Json | null
          assessment_id: string
          candidate_id: string
          id: string
          max_score: number | null
          score: number | null
          taken_at: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: string
          candidate_id: string
          id?: string
          max_score?: number | null
          score?: number | null
          taken_at?: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: string
          candidate_id?: string
          id?: string
          max_score?: number | null
          score?: number | null
          taken_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          company_id: string | null
          created_at: string
          duration_mins: number
          id: string
          job_id: string | null
          questions: Json
          title: string
          type: Database["public"]["Enums"]["assessment_type"]
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          duration_mins?: number
          id?: string
          job_id?: string | null
          questions?: Json
          title: string
          type?: Database["public"]["Enums"]["assessment_type"]
        }
        Update: {
          company_id?: string | null
          created_at?: string
          duration_mins?: number
          id?: string
          job_id?: string | null
          questions?: Json
          title?: string
          type?: Database["public"]["Enums"]["assessment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "assessments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "hiring_funnel"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "assessments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          about: string | null
          badge: Database["public"]["Enums"]["badge_level"]
          career_score: number
          created_at: string
          date_of_birth: string | null
          gender: string | null
          github_url: string | null
          headline: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          market_readiness: number
          open_to_work: boolean
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          about?: string | null
          badge?: Database["public"]["Enums"]["badge_level"]
          career_score?: number
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          market_readiness?: number
          open_to_work?: boolean
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          about?: string | null
          badge?: Database["public"]["Enums"]["badge_level"]
          career_score?: number
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          market_readiness?: number
          open_to_work?: boolean
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          candidate_id: string
          created_at: string
          file_url: string | null
          id: string
          issuer: string | null
          status: Database["public"]["Enums"]["verification_status"]
          title: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          file_url?: string | null
          id?: string
          issuer?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          title: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          file_url?: string | null
          id?: string
          issuer?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "certifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          business_reg_status: Database["public"]["Enums"]["verification_status"]
          created_at: string
          description: string | null
          employee_count: string | null
          gst_number: string | null
          id: string
          industry: string | null
          locations: string[] | null
          logo_url: string | null
          name: string
          owner_id: string
          rating: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          business_reg_status?: Database["public"]["Enums"]["verification_status"]
          created_at?: string
          description?: string | null
          employee_count?: string | null
          gst_number?: string | null
          id?: string
          industry?: string | null
          locations?: string[] | null
          logo_url?: string | null
          name: string
          owner_id: string
          rating?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          business_reg_status?: Database["public"]["Enums"]["verification_status"]
          created_at?: string
          description?: string | null
          employee_count?: string | null
          gst_number?: string | null
          id?: string
          industry?: string | null
          locations?: string[] | null
          logo_url?: string | null
          name?: string
          owner_id?: string
          rating?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          company_id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_members: {
        Row: {
          conversation_id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          job_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "hiring_funnel"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "conversations_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          candidate_id: string
          college: string | null
          created_at: string
          degree: string | null
          field: string | null
          graduation_year: number | null
          id: string
          marks: string | null
          school: string | null
        }
        Insert: {
          candidate_id: string
          college?: string | null
          created_at?: string
          degree?: string | null
          field?: string | null
          graduation_year?: number | null
          id?: string
          marks?: string | null
          school?: string | null
        }
        Update: {
          candidate_id?: string
          college?: string | null
          created_at?: string
          degree?: string | null
          field?: string | null
          graduation_year?: number | null
          id?: string
          marks?: string | null
          school?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          candidate_id: string
          company: string
          created_at: string
          end_date: string | null
          id: string
          is_current: boolean
          position: string
          responsibilities: string | null
          start_date: string | null
        }
        Insert: {
          candidate_id: string
          company: string
          created_at?: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          position: string
          responsibilities?: string | null
          start_date?: string | null
        }
        Update: {
          candidate_id?: string
          company?: string
          created_at?: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          position?: string
          responsibilities?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          description: string | null
          enabled: boolean
          key: string
        }
        Insert: {
          description?: string | null
          enabled?: boolean
          key: string
        }
        Update: {
          description?: string | null
          enabled?: boolean
          key?: string
        }
        Relationships: []
      }
      interview_feedback: {
        Row: {
          created_at: string
          id: string
          interview_id: string
          overall_score: number | null
          recommendation: string | null
          reviewer_id: string | null
          strengths: string | null
          weaknesses: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          interview_id: string
          overall_score?: number | null
          recommendation?: string | null
          reviewer_id?: string | null
          strengths?: string | null
          weaknesses?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          interview_id?: string
          overall_score?: number | null
          recommendation?: string | null
          reviewer_id?: string | null
          strengths?: string | null
          weaknesses?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_feedback_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_feedback_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string
          created_at: string
          duration_mins: number | null
          id: string
          location_or_link: string | null
          mode: Database["public"]["Enums"]["interview_mode"]
          scheduled_at: string | null
          status: Database["public"]["Enums"]["interview_status"]
        }
        Insert: {
          application_id: string
          created_at?: string
          duration_mins?: number | null
          id?: string
          location_or_link?: string | null
          mode?: Database["public"]["Enums"]["interview_mode"]
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["interview_status"]
        }
        Update: {
          application_id?: string
          created_at?: string
          duration_mins?: number | null
          id?: string
          location_or_link?: string | null
          mode?: Database["public"]["Enums"]["interview_mode"]
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["interview_status"]
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          currency: string
          department: string | null
          description: string | null
          employment_type: Database["public"]["Enums"]["job_type"]
          experience_max: number | null
          experience_min: number | null
          id: string
          industry: string | null
          location: string | null
          requirements: string | null
          responsibilities: string | null
          salary_max: number | null
          salary_min: number | null
          skills_required: string[] | null
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string
          vacancies: number
          views: number
          work_mode: Database["public"]["Enums"]["work_mode"]
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          currency?: string
          department?: string | null
          description?: string | null
          employment_type?: Database["public"]["Enums"]["job_type"]
          experience_max?: number | null
          experience_min?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string
          vacancies?: number
          views?: number
          work_mode?: Database["public"]["Enums"]["work_mode"]
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          department?: string | null
          description?: string | null
          employment_type?: Database["public"]["Enums"]["job_type"]
          experience_max?: number | null
          experience_min?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string
          vacancies?: number
          views?: number
          work_mode?: Database["public"]["Enums"]["work_mode"]
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          channel: Database["public"]["Enums"]["message_channel"]
          conversation_id: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string | null
        }
        Insert: {
          body: string
          channel?: Database["public"]["Enums"]["message_channel"]
          conversation_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string | null
        }
        Update: {
          body?: string
          channel?: Database["public"]["Enums"]["message_channel"]
          conversation_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboardings: {
        Row: {
          application_id: string
          checklist: Json
          completed: boolean
          created_at: string
          documents: Json
          id: string
          joining_letter_url: string | null
          nda_signed: boolean
          offer_letter_url: string | null
        }
        Insert: {
          application_id: string
          checklist?: Json
          completed?: boolean
          created_at?: string
          documents?: Json
          id?: string
          joining_letter_url?: string | null
          nda_signed?: boolean
          offer_letter_url?: string | null
        }
        Update: {
          application_id?: string
          checklist?: Json
          completed?: boolean
          created_at?: string
          documents?: Json
          id?: string
          joining_letter_url?: string | null
          nda_signed?: boolean
          offer_letter_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboardings_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      placements: {
        Row: {
          candidate_id: string | null
          commission: number | null
          created_at: string
          id: string
          job_id: string | null
          recruiter_id: string
          status: Database["public"]["Enums"]["placement_status"]
        }
        Insert: {
          candidate_id?: string | null
          commission?: number | null
          created_at?: string
          id?: string
          job_id?: string | null
          recruiter_id: string
          status?: Database["public"]["Enums"]["placement_status"]
        }
        Update: {
          candidate_id?: string | null
          commission?: number | null
          created_at?: string
          id?: string
          job_id?: string | null
          recruiter_id?: string
          status?: Database["public"]["Enums"]["placement_status"]
        }
        Relationships: [
          {
            foreignKeyName: "placements_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "hiring_funnel"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "placements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          candidate_id: string
          created_at: string
          description: string | null
          id: string
          title: string
          url: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          mfa_enabled: boolean
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          mfa_enabled?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          mfa_enabled?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          friend_email: string
          friend_name: string | null
          id: string
          job_id: string | null
          referrer_id: string
          reward_amount: number | null
          status: Database["public"]["Enums"]["referral_status"]
        }
        Insert: {
          created_at?: string
          friend_email: string
          friend_name?: string | null
          id?: string
          job_id?: string | null
          referrer_id: string
          reward_amount?: number | null
          status?: Database["public"]["Enums"]["referral_status"]
        }
        Update: {
          created_at?: string
          friend_email?: string
          friend_name?: string | null
          id?: string
          job_id?: string | null
          referrer_id?: string
          reward_amount?: number | null
          status?: Database["public"]["Enums"]["referral_status"]
        }
        Relationships: [
          {
            foreignKeyName: "referrals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "hiring_funnel"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "referrals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          kind: string
          reporter_id: string | null
          resolved: boolean
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          kind: string
          reporter_id?: string | null
          resolved?: boolean
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          kind?: string
          reporter_id?: string | null
          resolved?: boolean
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          candidate_id: string
          created_at: string
          file_url: string | null
          id: string
          is_primary: boolean
          label: string
          version: number
        }
        Insert: {
          candidate_id: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_primary?: boolean
          label?: string
          version?: number
        }
        Update: {
          candidate_id?: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_primary?: boolean
          label?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "resumes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_id: string | null
          body: string | null
          candidate_id: string | null
          company_id: string | null
          created_at: string
          id: string
          rating: number
          subject_type: string
          title: string | null
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          candidate_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          rating: number
          subject_type: string
          title?: string | null
        }
        Update: {
          author_id?: string | null
          body?: string | null
          candidate_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          rating?: number
          subject_type?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_calls: {
        Row: {
          ai_summary: string | null
          application_id: string
          availability: string | null
          completed: boolean
          created_at: string
          id: string
          notice_period: string | null
          salary_expectation: string | null
          transcript: string | null
        }
        Insert: {
          ai_summary?: string | null
          application_id: string
          availability?: string | null
          completed?: boolean
          created_at?: string
          id?: string
          notice_period?: string | null
          salary_expectation?: string | null
          transcript?: string | null
        }
        Update: {
          ai_summary?: string | null
          application_id?: string
          availability?: string | null
          completed?: boolean
          created_at?: string
          id?: string
          notice_period?: string | null
          salary_expectation?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screening_calls_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          candidate_id: string
          category: string
          created_at: string
          id: string
          name: string
          proficiency: number
        }
        Insert: {
          candidate_id: string
          category?: string
          created_at?: string
          id?: string
          name: string
          proficiency?: number
        }
        Update: {
          candidate_id?: string
          category?: string
          created_at?: string
          id?: string
          name?: string
          proficiency?: number
        }
        Relationships: [
          {
            foreignKeyName: "skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          active: boolean
          id: string
          owner_id: string
          renews_at: string | null
          started_at: string
          tier: Database["public"]["Enums"]["plan_tier"]
        }
        Insert: {
          active?: boolean
          id?: string
          owner_id: string
          renews_at?: string | null
          started_at?: string
          tier?: Database["public"]["Enums"]["plan_tier"]
        }
        Update: {
          active?: boolean
          id?: string
          owner_id?: string
          renews_at?: string | null
          started_at?: string
          tier?: Database["public"]["Enums"]["plan_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          candidate_id: string
          created_at: string
          doc_type: string | null
          doc_url: string | null
          id: string
          kind: string
          notes: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          candidate_id: string
          created_at?: string
          doc_type?: string | null
          doc_url?: string | null
          id?: string
          kind: string
          notes?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          candidate_id?: string
          created_at?: string
          doc_type?: string | null
          doc_url?: string | null
          id?: string
          kind?: string
          notes?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "verifications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      video_resumes: {
        Row: {
          candidate_id: string
          created_at: string
          duration_secs: number | null
          id: string
          label: string
          transcript: string | null
          video_url: string | null
          views: number
        }
        Insert: {
          candidate_id: string
          created_at?: string
          duration_secs?: number | null
          id?: string
          label?: string
          transcript?: string | null
          video_url?: string | null
          views?: number
        }
        Update: {
          candidate_id?: string
          created_at?: string
          duration_secs?: number | null
          id?: string
          label?: string
          transcript?: string | null
          video_url?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_resumes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      hiring_funnel: {
        Row: {
          cnt: number | null
          company_id: string | null
          job_id: string | null
          status: Database["public"]["Enums"]["application_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      current_role_is: {
        Args: { roles: Database["public"]["Enums"]["user_role"][] }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      manages_job: { Args: { jid: string }; Returns: boolean }
      owns_candidate: { Args: { cid: string }; Returns: boolean }
    }
    Enums: {
      application_status:
        | "applied"
        | "viewed"
        | "screening"
        | "shortlisted"
        | "interview_scheduled"
        | "offer_sent"
        | "hired"
        | "rejected"
        | "withdrawn"
      assessment_type: "coding" | "aptitude" | "language" | "subject" | "sales"
      badge_level: "none" | "bronze" | "silver" | "gold"
      interview_mode: "online" | "offline" | "phone"
      interview_status: "scheduled" | "completed" | "cancelled" | "no_show"
      job_status: "draft" | "open" | "paused" | "closed"
      job_type:
        | "full_time"
        | "part_time"
        | "internship"
        | "contract"
        | "freelance"
      match_band: "best" | "good" | "average" | "poor"
      message_channel: "in_app" | "email" | "whatsapp" | "sms"
      placement_status:
        | "sourced"
        | "recommended"
        | "interviewing"
        | "placed"
        | "rejected"
      plan_tier: "free" | "professional" | "enterprise"
      referral_status: "invited" | "applied" | "hired" | "reward_released"
      user_role:
        | "job_seeker"
        | "employer"
        | "recruiter"
        | "admin"
        | "super_admin"
      verification_status: "unverified" | "pending" | "verified" | "rejected"
      work_mode: "remote" | "hybrid" | "onsite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "applied",
        "viewed",
        "screening",
        "shortlisted",
        "interview_scheduled",
        "offer_sent",
        "hired",
        "rejected",
        "withdrawn",
      ],
      assessment_type: ["coding", "aptitude", "language", "subject", "sales"],
      badge_level: ["none", "bronze", "silver", "gold"],
      interview_mode: ["online", "offline", "phone"],
      interview_status: ["scheduled", "completed", "cancelled", "no_show"],
      job_status: ["draft", "open", "paused", "closed"],
      job_type: [
        "full_time",
        "part_time",
        "internship",
        "contract",
        "freelance",
      ],
      match_band: ["best", "good", "average", "poor"],
      message_channel: ["in_app", "email", "whatsapp", "sms"],
      placement_status: [
        "sourced",
        "recommended",
        "interviewing",
        "placed",
        "rejected",
      ],
      plan_tier: ["free", "professional", "enterprise"],
      referral_status: ["invited", "applied", "hired", "reward_released"],
      user_role: [
        "job_seeker",
        "employer",
        "recruiter",
        "admin",
        "super_admin",
      ],
      verification_status: ["unverified", "pending", "verified", "rejected"],
      work_mode: ["remote", "hybrid", "onsite"],
    },
  },
} as const
