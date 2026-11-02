import { Eyebrow } from "@/components/layout/eyebrow";
import { MotionReveal } from "@/components/layout/motion-reveal";
import { Section } from "@/components/layout/section";
import { SECTION_TONE_CLASS, type SectionTone } from "@/lib/section-backgrounds";
import { cn } from "@/lib/utils";

const topics = [
  {
    title: "AI engineering in production",
    description:
      "Evals, testing non-deterministic systems, tracing and observability, prompt and context engineering.",
    tags: ["Evals", "Observability", "Context"],
  },
  {
    title: "AI platforms",
    description:
      "Self-service platforms for AI teams: model serving, inference, gateways, routing, and GPU scheduling.",
    tags: ["Inference", "Gateways", "GPUs"],
  },
  {
    title: "Agents and agentic systems",
    description:
      "Tool use, MCP, orchestration, memory, and keeping agents reliable once they act on real systems.",
    tags: ["MCP", "Orchestration", "Memory"],
  },
  {
    title: "Retrieval and data",
    description:
      "RAG pipelines, embeddings, vector search, and getting the right context to the model at the right time.",
    tags: ["RAG", "Vector search", "Pipelines"],
  },
  {
    title: "Open models and fine-tuning",
    description:
      "Open-weight models, fine-tuning and distillation, and running them on infrastructure you control.",
    tags: ["Open weights", "Fine-tuning", "Self-hosting"],
  },
  {
    title: "Security, cost and governance",
    description:
      "Guardrails, prompt injection, cost per task, sovereignty, and what the EU AI Act means for engineers.",
    tags: ["Guardrails", "Cost", "EU AI Act"],
  },
] as const;

type TopicsProps = {
  tone?: SectionTone;
};

/** What the day is about: AI engineering and the platforms underneath it. */
export function Topics({ tone = "default" }: TopicsProps) {
  return (
    <Section id="topics" className={cn("scroll-mt-20", SECTION_TONE_CLASS[tone])}>
      <div className="max-w-3xl">
        <MotionReveal>
          <Eyebrow className="mb-5">Topics</Eyebrow>
          <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-primary sm:text-4xl lg:text-5xl">
            Everything it takes
            {" "}
            <br />
            <span className="text-signal-ink">to ship AI</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            From the model call to the platform underneath it. If you build it, run it, or keep it
            safe, it belongs on this stage.
          </p>
        </MotionReveal>
      </div>

      <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map(({ title, description, tags }, index) => (
          <li key={title} className="border-t border-graphite/25">
            <MotionReveal delay={0.04 * index} className="h-full">
              <div className="flex h-full flex-col py-7 sm:py-8">
                <p className="annotation text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-[-0.015em] text-primary sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="annotation rounded-sm border border-border px-2 py-1 text-[0.68rem] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
