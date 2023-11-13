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
      <h2 className='text-2xl font-bold text-slate-700'>Meet The Team</h2>

      <AgentsSection className='flex flex-wrap gap-4'>
        {agents.map((agent) => (
          <AgentCard key={agent._id}>
            <AgentAvatarContainer>
              <AgentAvatar src={agent.avatar} width='500' height='500' />
            </AgentAvatarContainer>
            <h3 className="text-xl font-semibold">{agent.username}</h3>
          </AgentCard>
        ))}
      </AgentsSection>
    </AgentsContainer>
  );
};

export default TheAgents;
