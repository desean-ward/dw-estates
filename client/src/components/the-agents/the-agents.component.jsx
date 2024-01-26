import {
  AgentAvatar,
  AgentAvatarContainer,
  AgentCard,
  AgentsContainer,
  AgentsSection,
} from "./the-agents.styles";

import { useInView } from "react-intersection-observer";

const TheAgents = ({ agents }) => {
  const [agentRef, inView] = useInView();

  // Animate the agents section with staggerChildren
  const staggerIn = {
    initial: (idx) => ({
      scale: 0,
      transition: { duration: 0.3, delay: 0.2 * idx },
    }),
    animate: (idx) => ({
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 * idx },
    }),
  };

  return (
    <AgentsContainer>
      <div className='max-w-7xl'>
        <h2 className='mx-4 text-2xl font-bold text-slate-700 '>
          Meet The Team
        </h2>

        <AgentsSection ref={agentRef}>
          {agents.map((agent, idx) => (
            <AgentCard
              key={agent._id}
              variants={staggerIn}
              initial='initial'
              animate={inView ? "animate" : "initial"}
              custom={idx}
            >
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
