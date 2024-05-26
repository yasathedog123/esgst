import { Module } from '../../class/Module';
import { DOM } from '../../class/DOM';

class GeneralNarrowSidebar extends Module {
	constructor() {
		super();
		this.info = {
			description: () => (
				<ul>
					<li>Keeps the sidebar narrowed in all pages.</li>
				</ul>
			),
			id: 'ns',
			name: 'Narrow Sidebar',
			sg: true,
			type: 'general',
		};
	}

	init() {
		if (!this.esgst.sidebar) return;
		this.esgst.sidebar.classList.remove('sidebar--wide');
		this.esgst.sidebar.classList.add('esgst-ns');
		this.esgst.sidebar.style.minWidth = `206px`;
		this.esgst.sidebar.style.width = `206px`;
	}
}

const generalNarrowSidebar = new GeneralNarrowSidebar();

export { generalNarrowSidebar };
