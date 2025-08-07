// src/components/leads/FonteMeioTag.tsx
interface Props {
    fonte?: string
    meio?: string
}
export function LeadFonteMeioTag({ fonte, meio }: Props) {
    if (!fonte && !meio) return null;

    const clean = (text: string) => text.trim().toLowerCase().replace(/\s+/g, '');
    const mesma = fonte && meio && clean(fonte) === clean(meio);

    return (
        <span className="text-gray-900">
      {mesma ? fonte : `${fonte} (${meio})`}
    </span>
    );
}
