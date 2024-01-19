import React from "react";
import {
  AgentAvatar,
  AgentAvatarContainer,
  AgentCard,
  AgentsContainer,
  AgentsSection,
} from "./the-agents.styles";

const TheAgents = ({ agents }) => {
  return (
    <AgentsContainer>
      <div className="max-w-7xl">
        <h2 className='mx-4 text-2xl font-bold text-slate-700 '>
          Meet The Team
        </h2>
        
        <AgentsSection>
          {agents.map((agent) => (
            <AgentCard key={agent._id}>
              <AgentAvatarContainer>
                <AgentAvatar src={agent.avatar} width='100' height='100' />
              </AgentAvatarContainer>
              <h3 className='text-xl font-semibold'>{agent.username}</h3>
            </AgentCard>
          ))}
        </AgentsSection>
      </div>
    </AgentsContainer>
  );
};

export default TheAgents;
