'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Mail, Building, DollarSign, Calendar, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'

interface PipelineStage {
  id: string
  name: string
  color: string
  order_index: number
}

interface Lead {
  id: string
  email: string
  full_name: string
  company?: string
  phone?: string
  status: string
  priority: string
  estimated_value?: number
  created_at: string
  pipeline_stage_id: string
}

interface PipelineViewProps {
  onStatsUpdate: () => void
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

export function PipelineView({ onStatsUpdate }: PipelineViewProps) {
  const [stages, setStages] = useState<PipelineStage[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadPipelineData()
  }, [])

  const loadPipelineData = async () => {
    try {
      setLoading(true)
      
      // Load pipeline stages
      const { data: stagesData, error: stagesError } = await supabase
        .from('pipeline_stages')
        .select('*')
        .order('order_index')

      if (stagesError) throw stagesError
      
      // Load leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (leadsError) throw leadsError
      
      setStages(stagesData || [])
      setLeads(leadsData || [])
    } catch (error) {
      console.error('Error loading pipeline data:', error)
    } finally {
      setLoading(false)
    }
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result
    
    if (source.droppableId === destination.droppableId) return

    try {
      // Update lead's pipeline stage
      const { error } = await supabase
        .from('leads')
        .update({ 
          pipeline_stage_id: destination.droppableId,
          status: getStatusFromStage(destination.droppableId)
        })
        .eq('id', draggableId)

      if (error) throw error

      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === draggableId 
            ? { 
                ...lead, 
                pipeline_stage_id: destination.droppableId,
                status: getStatusFromStage(destination.droppableId)
              }
            : lead
        )
      )
      
      onStatsUpdate()
    } catch (error) {
      console.error('Error updating lead stage:', error)
    }
  }

  const getStatusFromStage = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId)
    if (!stage) return 'new'
    
    const stageNameLower = stage.name.toLowerCase()
    if (stageNameLower.includes('new') || stageNameLower.includes('initial')) return 'new'
    if (stageNameLower.includes('contact')) return 'contacted'
    if (stageNameLower.includes('qualif')) return 'qualified'
    if (stageNameLower.includes('proposal')) return 'proposal'
    if (stageNameLower.includes('negotiat')) return 'negotiation'
    if (stageNameLower.includes('won') || stageNameLower.includes('closed')) return 'closed_won'
    if (stageNameLower.includes('lost')) return 'closed_lost'
    return 'new'
  }

  const getLeadsForStage = (stageId: string) => {
    return leads.filter(lead => lead.pipeline_stage_id === stageId)
  }

  const getTotalValueForStage = (stageId: string) => {
    return getLeadsForStage(stageId)
      .reduce((total, lead) => total + (lead.estimated_value || 0), 0)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Loading pipeline...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageLeads = getLeadsForStage(stage.id)
              const totalValue = getTotalValueForStage(stage.id)
              
              return (
                <div key={stage.id} className="flex-shrink-0 w-80">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{stage.name}</h3>
                      <Badge 
                        style={{ backgroundColor: stage.color }}
                        className="text-white"
                      >
                        {stageLeads.length}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Total: ${totalValue.toLocaleString()}
                    </div>
                  </div>
                  
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] p-2 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        {stageLeads.map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 p-4 bg-white rounded-lg border shadow-sm transition-shadow ${
                                  snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{lead.full_name}</h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      <Mail className="h-3 w-3 mr-1" />
                                      {lead.email}
                                    </div>
                                  </div>
                                  
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </div>
                                
                                {lead.company && (
                                  <div className="flex items-center text-xs text-gray-500 mb-2">
                                    <Building className="h-3 w-3 mr-1" />
                                    {lead.company}
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between">
                                  <Badge className={priorityColors[lead.priority as keyof typeof priorityColors]}>
                                    {lead.priority}
                                  </Badge>
                                  
                                  {lead.estimated_value && (
                                    <div className="flex items-center text-xs font-medium text-green-600">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {lead.estimated_value.toLocaleString()}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center text-xs text-gray-400 mt-2">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(lead.created_at), 'MMM d')}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {stageLeads.length === 0 && (
                          <div className="text-center text-gray-400 text-sm py-8">
                            No leads in this stage
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}